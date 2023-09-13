<?php

declare(strict_types=1);

namespace System\Handlers;

use System\Core\Domain\DTO\ResponseDTO;
use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\NotFoundException;
use System\Core\Exceptions\NotLoggedInException;
use System\Core\Exceptions\UnauthorizedException;
use System\Orders\OrdersController;
use System\Products\ProductController;
use System\Users\UserController;
use System\Router;

class OrdersHandler {

    public function __construct(
        private UserController $userController = new UserController(),
        private ProductController $productController = new ProductController(),
        private OrdersController $controller = new OrdersController()
    ) { }

    public function init(string $subsection, string $action, Array $data): ResponseDTO {
        if(!empty($subsection)) {
            switch($subsection) {
                case "buy": return $this->quickBuy($action, $data['amount'] ?? "");
                default: throw new NotFoundException();
            }
        }

        switch($action) {
            case "new": return $this->createNewOrder(
                $data['user_id'] ?? "",
                $data['product_id'] ?? "",
                $data['amount'] ?? "",
            );

            case "get": return $this->getOrder($data['order_id'] ?? "");
            case "remove": return $this->removeFromCart($data['order_id'] ?? "", $data['product_id'] ?? "");
            default: throw new NotFoundException();
        }
    }

    private function quickBuy(string $productId, string $amount): ResponseDTO {
        if(Router::$CURRENT_USER === null) throw new NotLoggedInException();
        if(!is_numeric($productId)) throw new InvalidArgumentException("INVALID_PRODUCT_ID");
        $order = Router::$CURRENT_USER->getCart();

        if(empty($amount) || !empty($amount) && !is_numeric($amount)) $amountToAdd = 1;
        else $amountToAdd = $amount;

        $product = $this->productController->getProductById(intval($productId));
        if($order === null) return new ResponseDTO($this->controller->createOrder(Router::$CURRENT_USER, $product, 1));
        else return new ResponseDTO($this->controller->addToCart($order, $product, intval($amountToAdd)));
    }

    private function removeFromCart(string $orderId, string $productId): ResponseDTO {
        $order = $this->controller->getOrderById(intval($orderId));
    }

    private function createNewOrder(string $userId, string $productId, string $amount): ResponseDTO {
        $errors = Array();
        $user = null;

        if(empty($userId)) {
            if(Router::$CURRENT_USER === null) $errors[] = "NO_USER";
            else $user = Router::$CURRENT_USER;
        } else {
            if(!is_numeric($userId)) $errors[] = "INVALID_USER_ID";
            else $user = $this->userController->getUserById($userId);
        }

        if(!empty($productId) && !is_numeric($productId)) $errors[] = "INVALID_PRODUCT_ID";
        if(!empty($amount) && !is_numeric($amount)) $errors[] = "INVALID_AMOUNT";

        if(!empty($errors)) throw new InvalidArgumentException($errors);
        
        if(empty($productId)) $product = null;
        else $product = $this->productController->getProductById(intval($productId));

        return new ResponseDTO($this->controller->createOrder($user, $product, intval($amount)));
    }

    private function getOrder(string $orderId): ResponseDTO {
        if(empty($orderId)) {
            if(Router::$CURRENT_USER === null) throw new InvalidArgumentException("NO_ORDER");
            else {
                $order = Router::$CURRENT_USER->getCart();
                if($order === null) throw new InvalidArgumentException("USER_HAS_NO_ORDER");
                return new ResponseDTO($order->toArray());
            }
        } else {
            if(!is_numeric($orderId)) throw new InvalidArgumentException("NO_ORDER_ID");
            return new ResponseDTO($this->controller->getOrderById(intval($orderId)));
        }
    }
}
