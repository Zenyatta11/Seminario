<?php

declare(strict_types=1);

namespace System\Products;
use System\Core\Exceptions\InvalidArgumentException;
use System\Miscellaneous\MiscController;
use System\Models\Dimension;
use System\Models\Product;

class ProductController {

	public function __construct(
		private ProductRepository $repository = new ProductRepository(),
		private MiscController $miscController = new MiscController()
	) { }
	public function getVariationDataById(Array $data): Array {
		if(!$data['variation_id']) return $data;
		return $this->repository->getVariationDataById($data);
	}

	private function createProduct(
        int $categoryId, int | null $subcategoryId, float $weight, 
        float $price, int $stock, float $width, float $height, 
        float $length, string $state, string $name, string $description
    ): bool {
		if($this->miscController->checkCategoryExistsById($categoryId)) 
			throw new InvalidArgumentException("INEXISTANT_CATEGORY");
		if($subcategoryId !== null && $this->miscController->checkSubCategoryExistsById($subcategoryId, $categoryId)) 
			throw new InvalidArgumentException("INEXISTANT_SUBCATEGORY");

		return $this->repository->createProduct(
					$categoryId,
					$subcategoryId,
					$weight,
					$price,
					$length,
					$width,
					$height,
					$stock,
					$state,
					$name,
					$description
			);
	}
}

?>
