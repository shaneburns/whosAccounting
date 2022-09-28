<?php
namespace app\models;

use ChemCommon\dbContext;
use core\Beans\Balancer;
use core\Daos\BalancerDao;

class AccountingModels
{
    public function EnterInitials($initials){
        $db = new dbContext();
        $Balancer = new Balancer($initials);
        $balDao = new BalancerDao($db->ctx);
        try {
            $balDao->save($Balancer);
            return ["success"=>true, "dateTime"=>$Balancer->getCreatedAt()->format('m/d/Y H:i:s T')];
        } catch (\Throwable $th) {
            return false;
        }
        return $Balancer;
    }

    public function GetListOfInitials(){
        $db = new dbContext();
        $balDao = new BalancerDao($db->ctx);
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