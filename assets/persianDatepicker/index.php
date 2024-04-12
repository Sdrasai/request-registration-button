<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>persian-datepicker</title>
    <link rel="stylesheet" href="persian-datepicker.min.css"/>
    <script src="../js/jquery-3.6.1.min.js"></script>
    <script src="persian-date.min.js"></script>
    <script src="persian-datepicker.min.js"></script>
</head>
<body>

<script type="text/javascript">
    $(document).ready(function() {
        //$(".pdatapicker").pDatepicker();
        $('.pdatapicker').persianDatepicker({
            initialValueType: 'persian', //gregorian
            observer: true,
            format: 'YYYY/MM/DD',
            autoClose: true,
            checkDate: function(unix){
                return new persianDate(unix).day() < 6;
            },
            checkYear: function(year){
                return year >= 1399;
            },
            calendar:{
                persian: {
                    'locale': 'en',
                }
            },
            onSelect: function(unix){
                //console.log('datepicker select : ' + unix);
                //alert('datepicker select : ' + unix);
            },

        });
    });
</script>

<form action="show.php" method="post">
    <input type="text" name="date_history" class="pdatapicker" value="<?php //echo date("Y-m-d"); ?>" />
    <input type="submit">
</form>


</body>
</html>