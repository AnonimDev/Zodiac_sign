<?php
namespace app\controllers;

use vendor\anom\core\Controller;

class MainController extends Controller
{

    public function index(){
        self::rend('main');
    }
    public function ajax(){
        if (!empty($_POST['y']) || !empty($_POST['m']) || !empty($_POST['d'])){
            $y = $_POST['y'];
            $m = $_POST['m'];
            $d = $_POST['d'];
            die(json_encode(array('status' => 200, 'text' => 'Ваш знак зодиака: <b>' . $this->zodiak($m, $d) . '</b>')));
        } else die(json_encode(array('status' => 400, 'text' => "Введите дату.")));
    }

    private function zodiak($m, $d){
        $rez = 0;
        $data = \DateTime::createFromFormat('d.m', $d.'.'.$m);
        $zod = [
            ['Козерог',['1','1'],['19','1']],
            ['Водолей',['20','1'],['19','02']],
            ['Рыбы',['20','02'],['21','03']],
            ['Овен',['22','03'],['21','04']],
            ['Телец',['22','04'],['21','05']],
            ['Близнецы',['22','05'],['21','06']],
            ['Рак',['22','06'],['21','07']],
            ['Лев',['22','07'],['21','08']],
            ['Дева',['22','08'],['21','09']],
            ['Весы',['22','09'],['21','10']],
            ['Скорпион',['22','10'],['20','11']],
            ['Стрелец',['21','11'],['21','12']],
            ['Козерог',['22','12'],['31','12']],
        ];
        foreach ($zod as $index => $item) {
            $a = \DateTime::createFromFormat('d.m', $zod[$index][1][0].'.'.$zod[$index][1][1]);
            $b = \DateTime::createFromFormat('d.m', $zod[$index][2][0].'.'.$zod[$index][2][1]);
            if ($data >= $a and $data <= $b){
                $rez = $zod[$index][0];
            }
        }
        return $rez;
    }
}