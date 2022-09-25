<?php
/*
 * This file has been automatically generated by TDBM.
 * You can edit this file as it will not be overwritten.
 */

declare(strict_types=1);

namespace core\Beans;

use core\Beans\Generated\AbstractBalancer;

/**
 * The Balancer class maps the 'balancers' table in database.
 */
class Balancer extends AbstractBalancer
{
    /**
     * The constructor takes all compulsory arguments.
     *
     * @param string $initials
     */
    public function __construct(string $initials = 'aaa')
    {
        if(strlen($initials) > 3) $initials = substr($initials, 0, 3);
        if(strlen($initials) < 3){
            $needsThisMany = 3 - strlen($initials);
            for ($i=$needsThisMany;$i--;) { 
                $initials .= 'a';
            }
        }
        $initials = \htmlentities($initials, ENT_QUOTES, 'UTF-8');
        parent::__construct($initials);
        
    }
    
}