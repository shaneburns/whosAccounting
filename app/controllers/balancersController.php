<?php 
namespace app\controllers;
use ChemMVC\controller as Controller;
use ChemCommon\dbContext;
use ChemCommon\result;

use app\models\AccountingModels;

class balancersController extends Controller
{
    function index(){
        return parent::view();
    }

    function allInitials(){
        $db = new dbContext();
        $accounts = new AccountingModels();
        $formattedList = $accounts->GetListOfInitials($db->ctx);
        return new result($formattedList);
    }
}
