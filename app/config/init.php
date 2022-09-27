<?php
// namespace config;
require_once APP_ROOT . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
use ChemCommon\config;
use ChemMVC\ChemMVC;
/**
 *
 */
class Main
{
    public $config;
    public $chem;

    function __construct()
    {
        $customVars = array(
            'ROOT' => '../app',
            'PROJECT_NAMESPACE' => 'app', // This should utilize a 'psr' autoloaded namespace *Required for chemistry project to work correctly
            'CORE_NAMESPACE' => 'core',
            'ENV_DETAILS_PATH' => APP_ROOT.DIRECTORY_SEPARATOR.'.env',
            'CONTROLLER_NAMESPACE' => 'controllers',
            // 'CORE_NAMESPACE' => 'core'
        );
        // Instantiate a startup array configuration vars for this app
        $this->config = new config($customVars);
        // Instantiate Chemistry MVC - pass in config
        $this->chem = new ChemMVC($this->config);
    }
}
