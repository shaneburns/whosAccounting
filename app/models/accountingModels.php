<?php
namespace app\models;

use core\Beans\Balancer;
use core\Daos\BalancerDao;

class AccountingModels
{
    public function EnterInitals($ctx, $initials){
        $Balancer = new Balancer($initials);
        $balDao = new BalancerDao($ctx);
        try {
            $balDao->save($Balancer);
            return true;
        } catch (\Throwable $th) {
            return false;
        }
        return $Balancer;
    }
}