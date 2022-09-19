<?php
namespace app;

define("APP_ROOT", '../app');
require_once APP_ROOT . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
use ChemMVC\startup;
use ChemMVC\bundleConfig;
use ChemMVC\chemistry;
/**
 *  Acati Main
 */
class Main
{
    public $config;
    public $chem;

    function __construct()
    {
        $customVars = array(
            'ROOT' => '../app',
            'PROJECT_NAMESPACE' => 'app', // *Required for chemistry:: This should utilize a 'psr' autoloaded namespace specified in composer.json 
            'CORE_NAMESPACE' => 'core', 
            'ENV_DETAILS_PATH' => APP_ROOT.DIRECTORY_SEPARATOR.'.env',
            'CONTROLLER_NAMESPACE' => 'controllers'
        );
        
        // Instantiate a chemistry startup configuration object and pass in your settings
        $this->config = new startup($customVars);
        // Instantiate Chemistry MVC - pass in config
        $this->chem = new chemistry($this->config);
    }
}
