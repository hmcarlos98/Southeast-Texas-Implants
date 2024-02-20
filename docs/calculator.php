<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Value Calculation Result</title>
<link rel="stylesheet" type="text/css" href="styling.css">
</head>
<body>
<div class="container">
    <h2>Result</h2>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $sum = 0;
        for ($i = 1; $i <= 17; $i++) {
            $value = $_POST['value'.$i];
            $sum += ($value - 1);
        }
        $result = $sum / 68;
        echo "<p>Result: $result</p>";
    }
    ?>
</div>
</body>
</html>