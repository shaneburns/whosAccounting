<?php
namespace app\models;

use core\Beans\Balancer;
use core\Daos\BalancerDao;

class AccountingModels
{
    public function EnterInitials($ctx, $initials){
        $Balancer = new Balancer($initials);
        $balDao = new BalancerDao($ctx);
        try {
            $balDao->save($Balancer);
            return ["success"=>true, "dateTime"=>$Balancer->getCreatedAt()->format('m/d/Y H:i:s T')];
        } catch (\Throwable $th) {
            return false;
        }
        return $Balancer;
    }

    public function GetListOfInitials($ctx){
        $balDao = new BalancerDao($ctx);
        $list = $balDao->findAll();

        $map = array_map(function($entry){
            return [
                "initials" => $entry->getInitials(),
                "createdAt" => $entry->getCreatedAt()->format('m/d/Y H:i:s T')
            ];
        }, $list->toArray());
        return $map;
    }
}