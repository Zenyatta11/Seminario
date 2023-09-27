<?php

declare(strict_types=1);

namespace System\Miscellaneous;
use System\Core\Database\Repository;
use System\Core\Exceptions\DatabaseWriteException;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Core\Util;
use System\Models\Address;
use System\Models\Category;
use System\Models\City;
use System\Models\Province;
use System\Models\Subcategory;

class MiscRepository extends Repository{

	public function getCategoryById(int $id): Category {
		$statement = "SELECT name FROM categories WHERE category_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        $data = $result->fetch_assoc();

        if($data === null) throw new NotFoundException();
        return new Category($id, $data["name"]);
	}

    public function checkCategoryExistsById(int $id): bool {
		$statement = "SELECT name FROM categories WHERE category_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows != 0);
	}

    public function getCategoriesWithSubcategories(): Array {
		$statement = "SELECT * FROM categories ORDER BY name ASC;";
        $result = $this->connection->execute_query($statement);
        if($result->num_rows === 0) throw new NotFoundException();

        $categories = Array();
        while($categories[] = $result->fetch_assoc());
        $categories = array_filter($categories);

        $returnValue = Array();
        foreach($categories as $item) {
            $subcategories = Array();

            try {
                $subcategories = $this->getSubCategoriesByCategoryId($item['category_id']);
            } catch(NotFoundException $exception) { }

            $returnValue[] = Array(
                'category_id' => $item['category_id'],
                'name' => $item['name'],
                'url_name' => Util::URL_NAME($item['name']),
                'subcategories' => $subcategories
            );
        }
        
        return $returnValue;
	}

    public function getCategories(): Array {
		$statement = "SELECT * FROM categories ORDER BY name ASC;";
        $result = $this->connection->execute_query($statement);
        if($result->num_rows === 0) throw new NotFoundException();

        $returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        $returnValue = array_filter($returnValue);
        
        return $returnValue;
	}

    public function getAddressesByUserId(int $userId): Array {
		$statement = "SELECT * FROM addresses WHERE user_id=?;";
        $result = $this->connection->execute_query($statement, Array($userId));
        if($result->num_rows === 0) return Array();

        $returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        $returnValue = array_filter($returnValue);
        
        return $returnValue;
	}

    public function getAddressById(int $id): Address | null {
		$statement = "SELECT * FROM addresses WHERE address_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement);
        if($result->num_rows === 0) return null;

        $data = $result->fetch_assoc();

        return new Address(
            $data['address_id'],
            $data['user_id'],
            $data['zip_code'],
            $this->getProvinceById($data['province_id']),
            $this->getCityById($data['city_id']),
            $data['number'],
            $data['street'],
            $data['extra']
        );
	}

	public function getSubCategoryByIdAndCategoryId(Category $category, int $id): Subcategory | null {
		$statement = "SELECT name FROM subcategories WHERE category_id=? AND subcategory_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($category->getId(), $id));

        return ($result->num_rows == 0 ? null : new Subcategory($id, $result->fetch_assoc()["name"], $category));
	}

    public function checkSubCategoryExistsById(int $id, int $categoryId): bool {
		$statement = "SELECT name FROM subcategories WHERE subcategory_id=? AND category_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id, $categoryId));

        return ($result->num_rows != 0);
	}

    public function getSubCategoriesByCategoryId($categoryId): Array {
		$statement = "SELECT * FROM subcategories WHERE category_id=? ORDER BY name ASC;";
        $result = $this->connection->execute_query($statement, Array($categoryId));
        if($result->num_rows === 0) throw new NotFoundException();

        $returnValue = Array();
        $max = $result->num_rows;

        for($i = 0; $i < $max; $i = $i + 1) {
            $subcategoryArray = $result->fetch_assoc();
            $subcategoryArray['url_name'] = Util::URL_NAME($subcategoryArray['name']);
            $returnValue[] = $subcategoryArray;
        }

        return $returnValue;
	}

    public function getProvinces(): Array {
		$statement = "SELECT * FROM provinces;";
        $result = $this->connection->execute_query($statement);
        if($result->num_rows === 0) throw new NotFoundException();

        $returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        return array_filter($returnValue);
	}

    public function getProvinceById(int $id): Province {
		$statement = "SELECT * FROM provinces WHERE province_id=?;";
        $result = $this->connection->execute_query($statement, Array($id));
        if($result->num_rows === 0) throw new NotFoundException();

        $data = $result->fetch_assoc();
        
        return new Province(
            $data['province_id'], 
            $data['name'], 
            $data['ISO3166']);
	}

    public function getCityById(int $id): City {
		$statement = "SELECT * FROM cities WHERE city_id=?;";
        $result = $this->connection->execute_query($statement, Array($id));
        if($result->num_rows === 0) throw new NotFoundException();

        $data = $result->fetch_assoc();
        
        return new City(
            $data['city_id'], 
            $data['name'], 
            $this->getProvinceById($data['province'])
        );
	}

    public function getCitiesByProvinceId(int $id): Array {
		$statement = "SELECT city_id, name FROM cities WHERE province=?;";
        $result = $this->connection->execute_query($statement, Array($id));
        
        if($result->num_rows === 0) throw new NotFoundException();

        $returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        return array_filter($returnValue);
	}

    public function verifyZipcode(int $code, int $provinceId): bool {
        $statement = "SELECT province FROM zip_codes WHERE zip_code=? AND province=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($code, $provinceId));

        return $result->num_rows != 0;
	}

    public function newCategory(string $name): bool {
        $statement = "INSERT INTO categories(name) VALUES(?)";
        return $this->connection->execute_query($statement, Array($name));
    }

    public function deleteCategory(int $id): bool {
        if($this->getCategoryById($id) === null) throw new InvalidArgumentException("CATEGORY_NOT_FOUND");

        $this->connection->begin_transaction();

        try {
            $deleteSubCategories = $this->deleteSubCategoriesByCategoryId($id);
            $statement = "DELETE FROM categories WHERE category_id=?";
            $deleteCategory = $this->connection->execute_query($statement, Array($id));
            $this->connection->commit();

            if(!$deleteSubCategories && $deleteCategory) 
                $this->connection->rollback();
            
            return $deleteSubCategories && $deleteCategory;
        } catch(\mysqli_sql_exception $exception) {
            $this->connection->rollback();
            throw new DatabaseWriteException();
        }
    }

    public function updateCategory(string $name, int $id): bool {
        if($this->getCategoryById($id) === null) throw new InvalidArgumentException("CATEGORY_NOT_FOUND");

        $this->connection->begin_transaction();

        try {
            $statement = "UPDATE categories SET name=? WHERE category_id=?";
            $this->connection->execute_query($statement, Array($name, $id));
            return $this->connection->commit();
        } catch(\mysqli_sql_exception $exception) {
            $this->connection->rollback();
            throw new DatabaseWriteException();
        }
    }

    public function newSubCategory(string $name, int $categoryId): bool {
        if($this->getCategoryById($categoryId) === null) throw new InvalidArgumentException("CATEGORY_NOT_FOUND");
        
        $statement = "INSERT INTO subcategories(category_id, name) VALUES(?,?)";
        return $this->connection->execute_query($statement, Array($categoryId, $name));
    }

    public function deleteSubCategory(int $id, int $categoryId): bool {
        $category = $this->getCategoryById($categoryId);
        if($category === null) throw new InvalidArgumentException("CATEGORY_NOT_FOUND");
        if($this->getSubCategoryByIdAndCategoryId($category, $id) === null) 
            throw new InvalidArgumentException("SUBCATEGORY_NOT_FOUND");

        $this->connection->begin_transaction();

        try {
            $statement = "DELETE FROM subcategories WHERE category_id=? AND subcategory_id=?";
            $this->connection->execute_query($statement, Array($categoryId, $id));
            return $this->connection->commit();
        } catch(\mysqli_sql_exception $exception) {
            $this->connection->rollback();
            throw new DatabaseWriteException();
        }
    }

    public function updateSubCategory(string $name, int $id, int $categoryId): bool {
        $category = $this->getCategoryById($categoryId);
        if($category === null) throw new InvalidArgumentException("CATEGORY_NOT_FOUND");
        if($this->getSubCategoryByIdAndCategoryId($category, $id) === null) 
            throw new InvalidArgumentException("SUBCATEGORY_NOT_FOUND");

        $this->connection->begin_transaction();

        try {
            $statement = "UPDATE subcategories SET name=? WHERE category_id=? AND subcategory_id=?";
            $this->connection->execute_query($statement, Array($name, $categoryId, $id));
            return $this->connection->commit();
        } catch(\mysqli_sql_exception $exception) {
            $this->connection->rollback();
            throw new DatabaseWriteException();
        }
    }

    private function deleteSubCategoriesByCategoryId(int $categoryId): bool {
        $statement = "DELETE FROM subcategories WHERE category_id=?";
        return $this->connection->execute_query($statement, Array($categoryId));
    }
}

?>
