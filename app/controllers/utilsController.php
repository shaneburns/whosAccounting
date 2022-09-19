<?php
namespace app\controllers;

use ChemMVC\controller as Controller;

class utilsController extends Controller{
    public function modal(){
        return parent::view();
    }
    public function loader(){
        return parent::view();
    }
    public function toasts(){
        return parent::view();
    }
}