<?php

declare(strict_types=1);

namespace System\Redistributable\Enviopack;

use System\Core\Exceptions\InvalidArgumentException;
use System\Core\Exceptions\ServerException;
use System\Models\Address;
use System\Models\Order;
use System\Models\User;
use System\Orders\OrdersController;
use System\Users\UserController;
use System\Core\Prefs;

class Enviopack {
    private string $token;

    public function __construct(
        private OrdersController $ordersController = new OrdersController(),
        private UserController $userController = new UserController()
    ) { 
        $this->token = $this->fetchToken();
    }

    private function fetchToken(): string {
        $apiKey = Prefs\Common::$SETTINGS['ep_api_key'];
        $secretKey = Prefs\Common::$SETTINGS['ep_secret_key'];

        $url = 'https://api.enviopack.com/auth';

        $data = Array(
            'api-key' => $apiKey,
            'secret-key' => $secretKey
        );

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, Array(
            'Content-Type: application/x-www-form-urlencoded',
            'Accept: application/json'
        ));

        $result = curl_exec($curl);

        if ($result === false) {
            throw new ServerException(curl_error($curl));
        } else {
            $data = json_decode($result, true);
            curl_close($curl);
            return $data['token'];
        }
    }

    public function cotizarEnvio(Order $order, User $user, Address $address): float {
        $weight = 0;
        $packages = Array();

        $products = $order->getProducts();
        foreach($products as $item) {
            $weight = $weight + (floor($item['product']->getWeight() * $item['amount'] * 100) / 100);

            for($i = 0; $i < $item['amount']; $i = $i + 1)
                $packages[] = implode("x", 
                    Array(
                            floor($item['product']->getDimensions()->getLength()),
                            floor($item['product']->getDimensions()->getWidth()),
                            floor($item['product']->getDimensions()->getHeight())
                        )
                    );
        }

        $parameters = Array(
            "access_token" => $this->token,
            "provincia" => $address->getProvince()->getISO3166(),
            "codigo_postal" => $address->getZipcode(),
            "peso" => $weight,
            "paquetes" => implode(",", $packages)
        );

        $apiUrl = 'https://api.enviopack.com/cotizar/costo';
        $queryString = http_build_query($parameters);

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $apiUrl . '?' . $queryString);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($curl);

        if ($response === false) throw new ServerException(curl_error($curl));
        curl_close($curl);
        
        if(count(json_decode($response, true)) === 0) throw new InvalidArgumentException("TOO_BIG");
        preg_match_all('/"valor":(\d*.?\d*)/', $response, $values, PREG_PATTERN_ORDER);
        
        return floatval(max($values[1]));
    }
}
?>