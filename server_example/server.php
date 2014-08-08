<?php
header('Content-Type: application/json');

file_put_contents('logs/log.txt', print_r($_GET, true)."\n\n", FILE_APPEND);


if (!isset($_GET['sec']))
{
$sections = array();

$sections[] = array('title'=>'Menu', 'items'=>array(array('title'=>'Weather', 'subtitle'=>'Pogoda naprimer'), array('title'=>'News'), array('title'=>'Some shit')));
$result = array('show'=>'Menu', 'sections'=>$sections);
}
else{
$sec=$_GET['sec'];
$lvl=$_GET['lvl'];
$item=$_GET['item'];


if ($lvl==0 && $sec==0 && $item==0)
{
    $result = array('show'=>'Card', 'level'=>1, 'card'=>array('title'=>'Pogoda', 'body'=>'Pogoda ohuenchik!'));
}



if ($lvl==0 && $sec==0 && $item==1)
{
    $sections[] = array('title'=>'News', 'items'=>array(array('title'=>'news1', 'subtitle'=>'V Rossii vse horosho!'), array('title'=>'news2', 'subtitle'=>'V Rossii vse ploho! =(') ));
    $result = array('show'=>'Menu', 'level'=>$lvl++, 'sections'=>$sections);
}

}



echo json_encode($result);

