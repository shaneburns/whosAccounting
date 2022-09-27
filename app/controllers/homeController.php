<?php 
namespace app\controllers;

use ChemMVC\controller as Controller;
use ChemCommon\dbContext;
use ChemCommon\result;

use app\models\AccountingModels;

class homeController extends Controller
{
    function index(){
        return parent::view();
    }

    function intro(){
        return parent::view('partial/intro');
    }

    function victory(){
        return parent::view('partial/victory');
    }

    function victoryLanding(){
        return parent::view('partial/victoryLanding');
    }

    function correct(){
        return parent::view('partial/correct');
    }

    function putResults(array $results, string $initials = ''){
        // Results and Initials of player inbound
        $db = new dbContext();
        $accounts = new AccountingModels();// Intance AccountingModels to Access the internal preocess
        $entry = $accounts->EnterInitials($db->ctx, $initials);// Put em down for a winning ticket

        return new result([ "success" => is_array($entry), "dateTime" => (is_array($entry) ? $entry['dateTime'] : '') ]);
    }
}
