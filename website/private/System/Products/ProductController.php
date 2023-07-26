<?php

declare(strict_types=1);

namespace System\Products;
use System\Models\Product;

class ProductController {

	public function __construct(
		private ProductRepository $repository = new ProductRepository()
	) { }
	public function getVariationDataById(Array $data): Array {
		if(!$data['variation_id']) return $data;
		return $this->repository->getVariationDataById($data);
	}
}

?>
