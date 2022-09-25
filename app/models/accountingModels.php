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
    public function GetListOfInitials($ctx){
        $balDao = new BalancerDao($ctx);
        $list = $balDao->findAll();

        $map = array_map('formatInitialsList', $list);
        return $map;
    }
    function formatInitialsList($entry){
        return [
            "initials" => $entry->getInitials(),
            "createdAt" => $entry->getCreatedAt()
        ];
    }
}