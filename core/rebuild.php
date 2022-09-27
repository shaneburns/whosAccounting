<?php
require_once 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
use ChemCore\Modules\Rebuild;

return new Rebuild(array(// Add constants vars here
    // 'VAR_ID' => "value"
    "ENV_DETAILS_PATH" => "c:\wamp\www\whosAccounting\core\.env",
    "PROJECT_NAMESPACE" => "core"
));
