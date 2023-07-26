<?php

declare(strict_types=1);

namespace System\Miscellaneous;
use InvalidArgumentException;
use System\Core\Database\Repository;
use System\Core\Exceptions\NotFoundException;
use System\Models\Category;
use System\Models\Subcategory;

class MiscRepository extends Repository{

	public function getCategoryById(int $id): Category | null {
		$statement = "SELECT name FROM categories WHERE category_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows == 0 ? null : new Category($id, $result->fetch_assoc()[0]));
	}

    public function getCategories(): array {
		$statement = "SELECT * FROM categories;";
        $result = $this->connection->execute_query($statement);
        if($result->num_rows === 0) throw new NotFoundException();

        $returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        $returnValue = array_filter($returnValue);

        return $returnValue;
	}

	public function getSubCategoryById($categoryId, int $id): Subcategory | null {
		$statement = "SELECT name FROM subcategories WHERE category_id=? AND subcategory_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($categoryId, $id));

        return ($result->num_rows == 0 ? null : new Subcategory($id, $result->fetch_assoc()[0]));
	}

    public function getSubCategories(): array {
		$statement = "SELECT * FROM subcategories;";
        $result = $this->connection->execute_query($statement);
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
        $this->connection->execute_query($statement, Array($name));

        return true;
    }

    public function newSubCategory(string $name, int $categoryId): bool {
        if($this->getCategoryById($categoryId) === null) throw new InvalidArgumentException("CATEGORY_NOT_FOUND");
        
        $statement = "INSERT INTO subcategories(category_id, name) VALUES(?)";
        $this->connection->execute_query($statement, Array($categoryId, $name));

        return true;
    }
}

?>
