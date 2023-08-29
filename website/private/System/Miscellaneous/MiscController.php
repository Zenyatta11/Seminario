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

	public function getCategoryById(int $id): Category | null {
		return $this->repository->getCategoryById($id);
	}

	public function checkCategoryExistsById(int $id): bool {
		return $this->repository->checkCategoryExistsById($id);
	}

	public function getCategories(): Array {
		return $this->repository->getCategories();
	}

	public function getCategoriesWithSubcategories(): Array {
		return $this->repository->getCategoriesWithSubcategories();
	}

	public function getSubCategoryById(Category $category, int $id): Subcategory | null {
		return $this->repository->getSubCategoryByIdAndCategoryId($category, $id);
	}

	public function checkSubCategoryExistsById(int $id, int $categoryId): bool {
		return $this->repository->checkSubCategoryExistsById($id, $categoryId);
	}

	public function getSubCategories(int $categoryId): Array {
		return $this->repository->getSubCategoriesByCategoryId($categoryId);
	}

	public function getCitiesByProvinceId(int $id): Array {
		return $this->repository->getCitiesByProvinceId($id);
	}

	public function getProvinces(): Array {
		return $this->repository->getProvinces();
	}

	public function verifyZipcode(int $code, int $provinceId): bool {
		return $this->repository->verifyZipcode($code, $provinceId);
	}

	public function newCategory(string $name): bool {
		if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::CATEGORIES_CREATE)) 
			throw new UnauthorizedException('CATEGORIES_CREATE');
		
		return $this->repository->newCategory($name);
	}

	public function deleteCategory(int $id): bool {
		if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::CATEGORIES_DELETE)) 
			throw new UnauthorizedException('CATEGORIES_DELETE');
		
		return $this->repository->deleteCategory($id);
	}

	public function updateCategory(string $name, int $id): bool {
		if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::CATEGORIES_MODIFY)) 
			throw new UnauthorizedException('CATEGORIES_MODIFY');
		
		return $this->repository->updateCategory($name, $id);
	}

	public function newSubCategory(string $name, int $categoryId): bool {
		if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::SUBCATEGORIES_CREATE)) 
			throw new UnauthorizedException('SUBCATEGORIES_CREATE');
		
		return $this->repository->newSubCategory($name, $categoryId);
	}

	public function deleteSubCategory(int $id, int $categoryId): bool {
		if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::SUBCATEGORIES_DELETE)) 
			throw new UnauthorizedException('SUBCATEGORIES_DELETE');
		
		return $this->repository->deleteSubCategory($id, $categoryId);
	}

	public function updateSubCategory(string $name, int $id, int $categoryId): bool {
		if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::SUBCATEGORIES_MODIFY)) 
			throw new UnauthorizedException('SUBCATEGORIES_MODIFY');
		
		return $this->repository->updateSubCategory($name, $id, $categoryId);
	}
}
