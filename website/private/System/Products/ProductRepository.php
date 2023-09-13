<?php

declare(strict_types=1);

namespace System\Products;
use System\Core\Database\Repository;
use System\Core\Exceptions\DatabaseWriteException;
use System\Core\Util;
use System\Models\Category;
use System\Models\Product;
use System\Models\Subcategory;

class ProductRepository extends Repository{

    public function __construct() {
        parent::__construct();
        $this->checkDiscountIntegrity();
    }

	public function getProductById(int $id): Product | null {
		$statement = "SELECT * FROM products WHERE product_id=? LIMIT 1;";
        $result = $this->connection->execute_query($statement, Array($id));

        return ($result->num_rows == 0 ? null : Product::BUILD(
                $result->fetch_assoc()
            )
        );
	}

    public function getLatestProducts(): Array {
		$statement = "
                SELECT
                p.product_id,
                p.weight,
                p.price,
                o.price AS offer,
                p.width,
                p.height,
                p.length,
                p.stock,
                p.name,
                p.description,
                p.category_id,
                c.name AS category,
                o.start_date
            FROM categories c, products p
            LEFT JOIN offers o ON o.product_id=p.product_id 
            WHERE p.state='A' AND p.category_id=c.category_id
            ORDER BY p.product_id DESC
            LIMIT 4";

        $result = $this->connection->execute_query($statement, Array());

        $max = $result->num_rows;
        $returnData = Array();

        for($i = 0; $i < $max; $i = $i + 1) {
            $productArray = $result->fetch_assoc();
            $productArray['url_name'] = Util::URL_NAME($productArray['name']);
            $returnData[] = $productArray;
        }
        
        return $returnData;
	}

    public function getDiscountProducts(): Array {
		$statement = "SELECT
                p.product_id,
                p.weight,
                p.price,
                o.price AS offer,
                p.width,
                p.height,
                p.length,
                p.stock,
                p.name,
                p.description,
                p.category_id,
                c.name AS category,
                o.start_date
            FROM categories c, products p, offers o
            WHERE p.state='A' AND p.category_id=c.category_id AND o.product_id=p.product_id
            ORDER BY p.product_id DESC
            LIMIT 4";
        $result = $this->connection->execute_query($statement);
        $max = $result->num_rows;
        $returnData = Array();

        for($i = 0; $i < $max; $i = $i + 1)
            $returnData[] = $result->fetch_assoc();
        
        return $returnData;
	}

    private function checkDiscountIntegrity(): void {
        $statement = "DELETE FROM offers o WHERE o.end_date <= NOW();";
        if(!$this->connection->execute_query($statement)) {
            throw new DatabaseWriteException();
        }
    }

    public function getFeaturedProducts(): Array {
        $statement = "
            SELECT
                p.product_id,
                p.weight,
                p.price,
                o.price AS offer,
                p.width,
                p.height,
                p.length,
                p.stock,
                p.name,
                p.description,
                p.category_id,
                c.name AS category,
                o.start_date
            FROM categories c, products p
            LEFT JOIN offers o ON o.product_id=p.product_id 
            WHERE p.state='A' AND p.category_id=c.category_id
            ORDER BY RAND()
            LIMIT 4";

        $result = $this->connection->execute_query($statement, Array());

        $max = $result->num_rows;
        $returnData = Array();

        for($i = 0; $i < $max; $i = $i + 1) {
            $productArray = $result->fetch_assoc();
            $productArray['url_name'] = Util::URL_NAME($productArray['name']);
            $returnData[] = $productArray;
        }

        return $returnData;
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

    public function getProductsBySubcategory(Subcategory $subcategory): Array {
		$statement = "
            SELECT
                p.product_id,
                p.weight,
                p.price,
                o.price AS offer,
                p.width,
                p.height,
                p.length,
                p.stock,
                p.name,
                p.description,
                c.category_id,
                c.name AS category,
                o.start_date
            FROM categories c, products p 
            LEFT JOIN offers o ON o.product_id=p.product_id 
            WHERE p.state='A' AND p.category_id=? AND p.subcategory_id=? AND p.category_id=c.category_id
            ORDER BY p.name";

        $result = $this->connection->execute_query($statement, 
            Array(
                $subcategory->getCategory()->getId(),
                $subcategory->getId()
            )
        );
        
        $max = $result->num_rows;
        $returnData = Array();

        for($i = 0; $i < $max; $i = $i + 1) {
            $productArray = $result->fetch_assoc();
            $productArray['url_name'] = Util::URL_NAME($productArray['name']);
            $returnData[] = $productArray;
        }
        
        return $returnData;
	}

    public function getProductsByCategory(Category $category): Array {
        $statement = "
            SELECT
                p.product_id,
                p.weight,
                p.price,
                o.price AS offer,
                p.width,
                p.height,
                p.length,
                p.stock,
                p.name,
                c.category_id,
                c.name AS category,
                p.description,
                o.start_date
            FROM categories c, products p 
            LEFT JOIN offers o ON o.product_id=p.product_id 
            WHERE p.state='A' AND p.category_id=? AND p.category_id=c.category_id
            ORDER BY p.name";

        $result = $this->connection->execute_query($statement, 
            Array(
                $category->getId()
            )
        );
        
        $max = $result->num_rows;
        $returnData = Array();

        for($i = 0; $i < $max; $i = $i + 1) {
            $productArray = $result->fetch_assoc();
            $productArray['url_name'] = Util::URL_NAME($productArray['name']);
            $returnData[] = $productArray;
        }
        
        return $returnData;
    }

    public function getProducts(): Array {
        $statement = "
            SELECT
                p.product_id,
                p.weight,
                p.price,
                o.price AS offer,
                p.width,
                p.height,
                p.length,
                p.stock,
                p.name,
                p.description,
                c.category_id,
                c.name AS category,
                o.start_date
            FROM categories c, products p 
            LEFT JOIN offers o ON o.product_id=p.product_id 
            WHERE state='A' AND c.category_id=p.category_id
            ORDER BY p.name";

        $result = $this->connection->execute_query($statement);
        
        $max = $result->num_rows;
        $returnData = Array();

        for($i = 0; $i < $max; $i = $i + 1) {
            $productArray = $result->fetch_assoc();
            $productArray['url_name'] = Util::URL_NAME($productArray['name']);
            $returnData[] = $productArray;
        }
        
        return $returnData;
    }
}

?>
