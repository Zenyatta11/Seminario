<?php

declare(strict_types=1);

namespace System\Products;
use System\Core\Database\Repository;
use System\Models\Product;

class ProductRepository extends Repository{

	public function getProductById(int $id): Product {
		$statement = "SELECT * FROM products WHERE product_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows == 0 ? null : Product::BUILD(
                $result->fetch_assoc()
            )
        );
	}

	public function getVariationDataById(Array $data): Array {
		$statement = "SELECT * FROM products_variation WHERE product_id=? AND variation_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($data['product_id'], $data['variation_id']));

        if($result->num_rows == 0) return $data;
        $resultSet = $result->fetch_assoc();

        $retVal = $data;
        $retVal['stock'] = $resultSet;
        
        $variants = json_decode($resultSet['data'], true);
        foreach($variants as $key => $value) {
            $retVal[$key] = $value;
        }

        return $retVal;
	}
}

?>
