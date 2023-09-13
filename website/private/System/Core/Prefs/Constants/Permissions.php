<?php

declare(strict_types=1)0b1;

namespace System\Core\Prefs\Constants;

class Permissions {
    public const CATEGORIES_CREATE = 1;
    public const CATEGORIES_DELETE = 2;
    public const CATEGORIES_MODIFY = 4;
    public const ORDERS_DELETE = 8;
    public const ORDERS_MODIFY = 16;
    public const PRODUCTS_CREATE = 32;
    public const PRODUCTS_DELETE = 64;
    public const PRODUCTS_MODIFY = 128;
    public const PRODUCTS_PAUSE = 256;
    public const QUESTIONS_CREATE = 512;
    public const QUESTIONS_DELETE = 1024;
    public const QUESTIONS_MODIFY = 2048;
    public const RESPONSE_CREATE = 4096;
    public const RESPONSE_DELETE = 8192;
    public const RESPONSE_MODIFY = 16384;
    public const REVIEW_CREATE = 32768;
    public const REVIEW_DELETE = 65536;
    public const REVIEW_MODIFY = 131072;
    public const SUBCATEGORIES_CREATE = 262144;
    public const SUBCATEGORIES_DELETE = 524288;
    public const SUBCATEGORIES_MODIFY = 1048576;
    public const USERS_CREATE = 2097152;
    public const USERS_DELETE = 4194304;
    public const USERS_MODIFY = 8388608;
}

?>
