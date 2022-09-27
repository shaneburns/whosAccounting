<?php 
namespace app\controllers;
use ChemMVC\controller as Controller;
use ChemMVC\result;

use app\models\AccountingModels;

class balancersController extends Controller
{
    function index(){
        return parent::view();
    }

    function allInitials(){
        $accounts = new AccountingModels();
        $formattedList = $accounts->GetListOfInitials($this->chem->tdbmService);
        return new result($formattedList);
    }
}
