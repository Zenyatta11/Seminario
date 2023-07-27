<div id="header">
    <div class="container" style="width: 100%;">
        <link href="Sources/css/Header.css" rel="stylesheet"/>
        <!-- 
        <?=$_CONTEXT['common']['header']['welcomeText']?>
        Navbar ================================================== -->
        <div id="logoArea" class="navbar">
        <a id="smallScreen" data-target="#topMenu" data-toggle="collapse" class="btn btn-navbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </a>
        <div class="navbar-inner" style="width: 100%;">
            <!-- Intente hacerlo lindo y como corresponde, el frontend no es lo mio.
            vengan esas tables! -->
            <table class="header-table">
                <tr>
                    <td rowspan="2" style="width: 25%;">
                        <a class="brand" href="index.html"><img src="Themes/Images/logo.png" alt="Bootsshop"/></a>
                    </td>
                    <td rowspan="2" style="width: 50%;">
                        <form class="form-inline navbar-search" method="post" action="products.html" >
                            <input id="srchFld" class="srchTxt" type="text" />
                            <button type="submit" id="submitButton" class="btn btn-primary">Go</button>
                        </form>
                    </td>
                    <td>
                        <a href="normal.html" style="width: 12.5%;">Ofertas</a>
                    </td>
                    <td>
                        <span class="btn btn-large btn-success" style="width: 12.5%;">Login</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <?php require_once("./Sources/Common/LanguageSelect.php"); ?>
                    </td>
                    <td>
                        <a href="product_summary.html">
                            <span class="btn btn-mini btn-primary" style="padding: 4px 12px; margin-left: 12px;min-width: 100px;display: inline-flex;">
                                <i class="icon-shopping-cart icon-white" style="font-size: medium;align-self: center;"></i>
                                <span style="width: 100%;">$0</span>
                            </span>
                        </a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>