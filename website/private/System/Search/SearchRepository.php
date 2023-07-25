<?php

declare(strict_types=1);

namespace System\Search;
use System\Core\Database\Repository;
use System\Models\Category;
use System\Models\Subcategory;

class SearchRepository extends Repository{

	public function getCategoryById(int $id) {
		$statement = "SELECT name FROM category WHERE category_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows == 0 ? null : new Category($id, $result->fetch_assoc()[0])
        );
	}

	public function getSubCategoryById(Category $category, int $id) {
		$statement = "SELECT name FROM subcategory WHERE category_id=? AND subcategory_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($category->getId(), $id));

        return ($result->num_rows == 0 ? null : new Subcategory($id, $result->fetch_assoc()[0])
        );
	}
}

?>