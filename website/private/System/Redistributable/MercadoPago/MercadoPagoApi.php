<?php

declare(strict_types=1);

namespace System\Redistributable\MercadoPago;
use System\Models\Address;
use System\Models\Order;
use System\Models\User;
use System\Core\Prefs;

class MercadoPagoApi {
    private string $accessToken;

    public function __construct( ) { 
        $this->accessToken = Prefs\Common::$SETTINGS['mp_access_token'];
        require(__DIR__ . '/../vendor/autoload.php');
    }

    public function getRedirect(Order $order, User $user, Address $address, float $montoEnvio, int $confirmationId): string {
        \MercadoPago\SDK::setAccessToken($this->accessToken);
        $preference = new \MercadoPago\Preference();
        
        $items = Array();

        foreach($order->getProducts() as $product) {
            $item = new \MercadoPago\Item();
            $item->title = $product['product']->getName();
            $item->quantity = $product['amount'];
            $item->unit_price = $product['product']->getDiscountPrice() ?? $product['product']->getPrice();

            $items[] = $item;
        }
        
        $shippingItem = new \MercadoPago\Item();
        $shippingItem->title = "Envío a Domicilio";
        $shippingItem->quantity = 1;
        $shippingItem->unit_price = $montoEnvio;
        $items[] = $shippingItem;
        
        $payer = new \MercadoPago\Payer();
        $payer->name = $user->getName();
        $payer->surname = "";
        $payer->email = $user->getEmail();
        
        $preference->statement_descriptor = "Batatas Club";
        $preference->notification_url = 'https://seminario.batatas.club/api/order/webhook';
        $preference->auto_return = 'all';
        
        $preference->back_urls = array(
            "success" => 'https://seminario.batatas.club/api/order/approved/' . hash("sha256", "ORDER" . $confirmationId),
            "failure" => 'https://seminario.batatas.club/api/order/failed/' . hash("sha256", "ORDER" . $confirmationId),
            "pending" => 'https://seminario.batatas.club/api/order/pending/' . hash("sha256", "ORDER" . $confirmationId)
        );
        
        $preference->items = $items;
        $preference->save();
        
        return $preference->init_point;
    }
}
?>