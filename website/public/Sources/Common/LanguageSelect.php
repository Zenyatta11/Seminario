<?php
    $locales = array_diff(scandir('./Sources/Common/Locales'), array('.', '..'));
    $options = "";

    foreach($locales as $localeFile) {
        $locale = strstr($localeFile, '.', true);
        $options = $options . '<option ' . ($_LANG['locale'] == $locale ? 'selected ' : '') . 'class="translate" value="' . $locale . '" key="language.' . $locale . '">' . $_LANG['language'][$locale] . '</option>';
    }

?>
<script>
    const fallbackLocale = '<?=$_CONTEXT['common']['fallbackLocale']?>';
</script>

<script src="Sources/js/Common/Language.js"></script>

<select onchange="loadLanguage(this)" style="width: auto;">
    <?=$options?>
</select>
