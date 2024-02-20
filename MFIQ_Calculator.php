<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Value Calculation</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
        text-align: center;
        color: #333;
    }
    label {
        font-weight: bold;
    }
    input[type="number"] {
        width: 50px;
        margin-right: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    input[type="submit"] {
        padding: 10px 20px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    input[type="submit"]:hover {
        background-color: #45a049;
    }
    p {
        text-align: center;
        font-size: 18px;
        color: #333;
        margin-top: 20px;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
    .grid-item {
        display: flex;
        align-items: center;
    }

</style>
</head>
<body>
<div class="container">
    <h2>Calculate MFIQ Score</h2>
    <form method="post" action="calculate.php" class="grid-container">
        <?php
        for ($i = 1; $i <= 17; $i++) {
            echo '<div class="grid-item">';
            echo '<span class="number">' .$i. '.  </span>';
            echo '<input type="number" name="value'.$i.'" id="value'.$i.'" min="1" max="5" required>';
            
            echo '</div>';
        }
        ?>
        <input type="submit" name="submit" value="Calculate" style="grid-column: span 4;">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $sum = 0;
        for ($i = 1; $i <= 17; $i++) {
            $value = $_POST['value'.$i];
            $sum += ($value - 1);
        }
        $result = $sum / 68;
        echo "<p>Score: $result</p>";
    }
    ?>
</div>
</body>
</html>