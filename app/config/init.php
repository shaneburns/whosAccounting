<?php
// namespace config;
require_once APP_ROOT . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
use ChemMVC\startup;
use ChemMVC\bundleConfig;
use ChemMVC\chemistry;
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
            'ENV_DETAILS_PATH' => APP_ROOT.DIRECTORY_SEPARATOR.'.env',
            'CONTROLLER_NAMESPACE' => 'controllers',
            // 'CORE_NAMESPACE' => 'core'
        );
        // Instantiate a startup configuration object
        $this->config = new startup($customVars);
        // Instantiate Chemistry MVC - pass in config
        $this->chem = new chemistry($this->config);
    }
}
