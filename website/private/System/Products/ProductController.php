<?php

declare(strict_types=1);

namespace System\Products;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Core\Exceptions\NotLoggedInException;
use System\Core\Exceptions\UnauthorizedException;
use System\Core\Prefs;
use System\Miscellaneous\MiscController;
use System\Models\Product;

class ProductController {

	public function __construct(
		private ProductRepository $repository = new ProductRepository(),
		private MiscController $miscController = new MiscController(),
	) { }

	public function deleteProduct(int $id, int | null $variationId): bool {
		if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::PRODUCTS_DELETE)) 
			throw new UnauthorizedException('PRODUCTS_DELETE');

		$productExists = ($variationId === null ? 
				$this->repository->checkProductExistsById($id)
				:
				$this->repository->checkProductVariationExistsById($id, $variationId));
		
		if(!$productExists) throw new NotFoundException();

		if($variationId === null) return $this->repository->deleteProductById($id);
		return $this->repository->deleteVariationById($id, $variationId);
	}

	public function getProductById(int $id): Product {
		if(!$this->repository->checkProductExistsById($id)) throw new NotFoundException();

		return $this->repository->getProductById($id);
	}

	public function getProductVariationById(int $id, int $variationId): Product {
		if(!$this->repository->checkProductVariationExistsById($id, $variationId)) throw new NotFoundException();

		return Product::BUILD(
			$this->repository->replaceDataWithVariation(
				$this->getProductById($id)->toArray()
			)
		);
	}

	public function replaceDataWithVariation(Array $data): Array {
		if(!$data['variation_id']) return $data;
		return $this->repository->replaceDataWithVariation($data);
	}

	private function createProduct(
        int $categoryId, int | null $subcategoryId, float $weight, 
        float $price, int $stock, float $width, float $height, 
        float $length, string $state, string $name, string $description
    ): bool {
		if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::PRODUCTS_CREATE)) 
			throw new UnauthorizedException('PRODUCTS_CREATE');

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
