<?php

declare(strict_types=1);

namespace System\Miscellaneous;

use System\Core\Exceptions\NotFoundException;
use System\Core\Exceptions\NotLoggedInException;
use System\Core\Exceptions\UnauthorizedException;
use System\Core\Prefs;
use System\Models\Category;
use System\Models\Subcategory;
use System\Products\ProductRepository;
use System\Router;
use System\Users\UserRepository;

class MiscController {
	
	public function __construct(
		private MiscRepository $repository = new MiscRepository(),
		private ProductRepository $productRepository = new ProductRepository(),
		private UserRepository $userRepository = new UserRepository()
	) {}

	public function getCategoryById(int $id): Category {
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

	public function getSubCategoryById(Category $category, int | null $id): Subcategory | null {
		if($id === null) return null;
		
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

	private function getQuestionsByProductId(int $productId): Array {
		if($this->productRepository->getProductById($productId) === null)
			throw new NotFoundException();
		
        return $this->repository->getQuestionsByProductId($productId);
    }

    private function getQuestionsByUserId(int $userId): Array {
        if($this->userRepository->getUserById($userId) === null)
			throw new NotFoundException();

        return $this->repository->getQuestionsByUserId($userId);
    }
    
    private function newQuestion(int $productId, string $question): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::QUESTIONS_CREATE)) 
			throw new UnauthorizedException('QUESTIONS_CREATE');

			return $this->repository->newQuestion($productId, Router::$CURRENT_USER->getId(), $question);
    }

    private function deleteQuestion(int $questionId): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::QUESTIONS_DELETE)) 
			throw new UnauthorizedException('QUESTIONS_DELETE');

		$this->repository->getQuestionById($questionId);
        return $this->repository->deleteQuestion($questionId, Router::$CURRENT_USER->getId());
    }

    private function updateQuestion(int $questionId, string $message): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::QUESTIONS_MODIFY)) 
			throw new UnauthorizedException('QUESTIONS_MODIFY');

		$this->repository->getQuestionById($questionId);
        return $this->repository->updateQuestion($questionId, Router::$CURRENT_USER->getId(), $message);
    }

    private function respondTo(int $questionId, string $response): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::RESPONSE_CREATE)) 
			throw new UnauthorizedException('RESPONSE_CREATE');

		$this->repository->getResponseById($questionId);
        return $this->repository->respondTo($questionId, Router::$CURRENT_USER->getId(), $response);
    }

    private function deleteResponse(int $questionId): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

		$response = $this->repository->getResponseById($questionId);

		if($response->getAuthor()->getId() != Router::$CURRENT_USER->getId() && !Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::RESPONSE_DELETE)) 
			throw new UnauthorizedException('RESPONSE_DELETE');

		$this->repository->getResponseById($questionId);
        return $this->repository->deleteResponse($questionId, Router::$CURRENT_USER->getId());
    }

    private function updateResponse(int $questionId, string $message): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		
		$response = $this->repository->getResponseById($questionId);
		
		if($response->getAuthor()->getId() != Router::$CURRENT_USER->getId() && !Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::RESPONSE_MODIFY)) 
			throw new UnauthorizedException('RESPONSE_MODIFY');

			return $this->repository->updateResponse($questionId, Router::$CURRENT_USER->getId(), $message);
    }

    private function createReview(int $productId, int $stars, string $title, string $description): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		if(!Router::$CURRENT_USER->hasBoughtProduct($productId) && !Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::REVIEW_CREATE)) 
			throw new UnauthorizedException('REVIEW_CREATE');

			return $this->repository->createReview($productId, Router::$CURRENT_USER->getId(), $stars, $title, $description);
    }

    private function deleteReview(int $reviewId): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
		
		$review = $this->repository->getReviewById($reviewId);
		
		if(!Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::REVIEW_DELETE)) 
			throw new UnauthorizedException('REVIEW_DELETE');

			return $this->repository->deleteReview($reviewId, Router::$CURRENT_USER->getId());
    }

    private function updateReview(int $reviewId, int $stars, string $title, string $description): bool {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();

		$review = $this->repository->getReviewById($reviewId);

		if($review->getAuthor()->getId() != Router::$CURRENT_USER->getId() && !Router::$CURRENT_USER->isAllowedTo(Prefs\Constants\Permissions::REVIEW_MODIFY)) 
			throw new UnauthorizedException('REVIEW_MODIFY');

			return $this->repository->updateReview($reviewId, Router::$CURRENT_USER->getId(), $stars, $title, $description);
    }

    private function getReviewsByProductId(int $reviewId): Array {
        return $this->repository->getReviewsByProductId($reviewId);
    }

    private function getReviewsByUserId(int $userId): Array {
        return $this->repository->getReviewsByUserId($userId);
    }

}
