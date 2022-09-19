<?php 
namespace app\controllers;
use ChemMVC\controller as Controller;

class homeController extends Controller
{
    function index(){
        return parent::view();
    }

    function putResults(array $results){
        // Dummy function for db interaction
        print_r($results);
    }
}
