<?php

declare(strict_types=1);

namespace System\Search;
use System\Core\Database\Repository;
use System\Models\Category;
use System\Models\Subcategory;

class SearchRepository extends Repository{

	public function getCategoryById(int $id): Category | null {
		$statement = "SELECT name FROM category WHERE category_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows == 0 ? null : new Category($id, $result->fetch_assoc()[0])
        );
	}

	public function getSubCategoryById(Category $category, int $id): Subcategory | null {
		$statement = "SELECT name FROM subcategory WHERE category_id=? AND subcategory_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($category->getId(), $id));

        return ($result->num_rows == 0 ? null : new Subcategory($id, $result->fetch_assoc()[0])
        );
	}

	public function pageSearchUsers(string $query, int $page): Array {
		$statement = "SELECT user_id, email, username, name FROM users WHERE username LIKE CONCAT(?,'%') LIMIT ?, ?";
		$result = $this->connection->execute_query($statement, Array($query, intval(floor($page / 24), $page * 24)));

		$returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        return array_filter($returnValue);
	}

	public function getUsernamesAndIds(string $query): Array {
		$statement = "SELECT user_id, username, name FROM users WHERE username LIKE CONCAT(?,'%') LIMIT ?, ?";
		$result = $this->connection->execute_query($statement, Array($query));

		$returnValue = Array();
        while($returnValue[] = $result->fetch_assoc());
        return array_filter($returnValue);
	}
}

?>
