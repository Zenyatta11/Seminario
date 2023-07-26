<?php

declare(strict_types=1);

namespace System\Miscellaneous;
use System\Core\Database\Repository;
use System\Core\Exceptions\DatabaseWriteException;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Models\Category;
use System\Models\Subcategory;

class MiscRepository extends Repository{

	public function getCategoryById(int $id): Category | null {
		$statement = "SELECT name FROM categories WHERE category_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows == 0 ? null : new Category($id, $result->fetch_assoc()["name"]));
	}

    public function getCategories(): array {
		$statement = "SELECT * FROM categories ORDER BY name ASC;";
        $result = $this->connection->execute_query($statement);
        if($result->num_rows === 0) throw new NotFoundException();

        $returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        $returnValue = array_filter($returnValue);
        
        return $returnValue;
	}

	public function getSubCategoryByIdAndCategoryId($categoryId, int $id): Subcategory | null {
		$statement = "SELECT name FROM subcategories WHERE category_id=? AND subcategory_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($categoryId, $id));

        return ($result->num_rows == 0 ? null : new Subcategory($id, $result->fetch_assoc()["name"]));
	}

    public function getSubCategoriesByCategoryId($categoryId): array {
		$statement = "SELECT * FROM subcategories WHERE category_id=? ORDER BY name ASC;";
        $result = $this->connection->execute_query($statement, Array($categoryId));
        if($result->num_rows === 0) throw new NotFoundException();

        $returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        $returnValue = array_filter($returnValue);

        return $returnValue;
	}

    public function getProvinces(): array {
		$statement = "SELECT * FROM provinces;";
        $result = $this->connection->execute_query($statement);
        if($result->num_rows === 0) throw new NotFoundException();

        $returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        $returnValue = array_filter($returnValue);

        return $returnValue;
	}

    public function getCitiesByProvinceId(int $id): array {
		$statement = "SELECT city_id, name FROM cities WHERE province=?;";
        $result = $this->connection->execute_query($statement, Array($id));
        
        if($result->num_rows === 0) throw new NotFoundException();

        $returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        $returnValue = array_filter($returnValue);

        return $returnValue;
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
        if($this->getCategoryById($categoryId) === null) throw new InvalidArgumentException("CATEGORY_NOT_FOUND");
        if($this->getSubCategoryByIdAndCategoryId($categoryId, $id) === null) throw new InvalidArgumentException("SUBCATEGORY_NOT_FOUND");

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
        if($this->getCategoryById($categoryId) === null) throw new InvalidArgumentException("CATEGORY_NOT_FOUND");
        if($this->getSubCategoryByIdAndCategoryId($categoryId, $id) === null) throw new InvalidArgumentException("SUBCATEGORY_NOT_FOUND");

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
