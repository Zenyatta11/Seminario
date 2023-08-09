<?php

declare(strict_types=1);

namespace System\Products;
use System\Core\Database\Repository;
use System\Core\Exceptions\DatabaseWriteException;
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

    public function deleteProductById(int $id): bool {
        $this->connection->begin_transaction();

        try {
            $statement = "DELETE FROM FROM products WHERE product_id=? LIMIT 1;";
            return $this->connection->execute_query($statement, Array($id));
        } catch(\mysqli_sql_exception $exception) {
            $this->connection->rollback();
            throw new DatabaseWriteException();
        }
	}

    public function deleteVariationById(int $id, int $variationId): bool {
        $this->connection->begin_transaction();

        try {
            $statement = "DELETE FROM FROM products_variation WHERE product_id=? AND variation_id=? LIMIT 1;";
            return $this->connection->execute_query($statement, Array($id, $variationId));
        } catch(\mysqli_sql_exception $exception) {
            $this->connection->rollback();
            throw new DatabaseWriteException();
        }
	}

    public function checkProductExistsById(int $id): bool {
        $statement = "SELECT product_id FROM products WHERE product_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return $result->num_rows !== 0;
    }

    public function checkProductVariationExistsById(int $id, int $variationId): bool {
        $statement = "SELECT product_id FROM products_variation WHERE product_id=? AND variation_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id, $variationId));

        return $result->num_rows !== 0;
    }

	public function replaceDataWithVariation(Array $data): Array {
		$statement = "SELECT * FROM products_variation WHERE product_id=? AND variation_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($data['product_id'], $data['variation_id']));

        if($result->num_rows == 0) return $data;
        $resultSet = $result->fetch_assoc();

        $retVal = $data;
        $retVal['stock'] = $resultSet;
        
        $variations = json_decode($resultSet['data'], true);
        foreach($variations as $key => $value) {
            $retVal[$key] = $value;
        }

        return $retVal;
	}

    public function createProduct(
        int $categoryId, int | null $subcategoryId, float $weight, 
        float $price, float $length, float $width, float $height, 
        int $stock, string $state, string $name, string $description
    ): bool {
		$statement = "INSERT INTO products(
                category_id, subcategory_id, weight, 
                price, stock, width, height, length, 
                state, name, description)
                VALUES(?,?,?,?,?,?,?,?,?,?,?)";

        return $this->connection->execute_query($statement, Array(
                $categoryId, $subcategoryId, $weight, $price, $stock, 
                $width, $height, $length, $state, $name, $description
            )
        );
	}
}

?>
