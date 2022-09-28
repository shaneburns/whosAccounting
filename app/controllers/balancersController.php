<?php 
namespace app\controllers;
use ChemMVC\controller as Controller;
use ChemCommon\result;

use app\models\accountingModels;

class balancersController extends Controller
{
    function index(){
        return parent::view();
    }

    function allInitials(){
        $accounts = new accountingModels();
        $formattedList = $accounts->GetListOfInitials();
        return new result($formattedList);
    }
}
