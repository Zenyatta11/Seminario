<?php

declare(strict_types=1);

namespace System\Miscellaneous;

use System\Core\Exceptions\NotLoggedInException;
use System\Core\Exceptions\UnauthorizedException;
use System\Core\Prefs;
use System\Models\Category;
use System\Models\Subcategory;
use System\Router;

class MiscController {
	
	public function __construct(
		private MiscRepository $repository = new MiscRepository()
	) {}

	public function getCategoryById(int $id): Category {
		return $this->repository->getCategoryById($id);
	}

	public function getCategories(): Array {
		return $this->repository->getCategories();
	}

	public function getSubCategoryById(Category $category, int $id): Subcategory | null {
		return $this->repository->getSubCategoryById($category, $id);
	}

	public function getSubCategories(): array {
		return $this->repository->getSubCategories();
	}

	public function getCitiesByProvinceId(int $id): array {
		return $this->repository->getCitiesByProvinceId($id);
	}

	public function getProvinces(): array {
		return $this->repository->getProvinces();
	}

	public function verifyZipcode(int $code, int $provinceId): bool {
		return $this->repository->verifyZipcode($code, $provinceId);
	}

	public function newCategory($name): bool {
		if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::CATEGORIES_CREATE)) throw new UnauthorizedException();
		
		return $this->repository->newCategory($name);
	}

	public function newSubCategory($name, $categoryId): bool {
		if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::SUBCATEGORIES_CREATE)) throw new UnauthorizedException();
		
		return $this->repository->newSubCategory($name, $categoryId);
	}
}
