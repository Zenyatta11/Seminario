<?php

declare(strict_types=1);

namespace System\Search;
use System\Models\Category;
use System\Models\Subcategory;

class SearchController {
	
	public function __construct(
		private SearchRepository $repository = new SearchRepository()
	) {}

	public function getCategoryById(int $id): Category {
		return $this->repository->getCategoryById($id);
	}

	public function getSubCategoryById(Category $category, int $id): Subcategory | null {
		return $this->repository->getSubCategoryById($category, $id);
	}
}
