<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Title -->
    <title>Shane Burns - <?php echo $this->title;?></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86">
    <meta name="theme-color" content="#deb887">
    <meta name="description" content="<?php echo $this->description; ?>">

    <!-- Styles -->
    <?php 
        if(count($this->styles) > 0) $this->renderStyleTags();
    ?>

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png">
    <link rel="manifest" href="/images/favicons/site.webmanifest">
    <link rel="mask-icon" href="/images/favicons/safari-pinned-tab.svg" color="#deb887">
    <link rel="shortcut icon" href="/images/favicons/favicon.ico">
    <meta name="msapplication-TileColor" content="#deb887">
    <meta name="msapplication-config" content="/images/favicons/browserconfig.xml">
</head>
