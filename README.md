# grunt-yii2

Create Grunt configuration for Yii2 advanced application

add this files for adding bootstrap and font awesome in ``composer.json``

```json
"require": {
    "bower-asset/bootstrap-sass-official": "@stable",
    "bower-asset/font-awesome": "@stable"
},
```

Create two JSON file and list of assets want to combine and minify

```
frontend/assets/css.json
frontend/assets/js.json
```
```
backend/assets/css.json
backend/assets/js.json
```

Run this command in root of project

```bash
npm install
```

Asset files loading should be disable in yii2 config file

```php
'components' => [
    // ...
    'assetManager' => [
        'bundles' => false,
    ],
],
```

SASS style files should include in ``backend/assets/styles/*.scss`` and ``frontend/assets/styles/*.scss``

I include bootstrap and font awesome sass version in ``style.scss`` file and compile in build time.

for build run ``grunt build`` in root of project

Asset will be create in
```
backend/web/scripts/all.js
backend/web/styles/all.css
```
```
frontend/web/scripts/all.js
frontend/web/styles/all.css
```

Add this css file in header section of page

```php
<?= Html::cssFile('@web/styles/all.css?v=' . filemtime(Yii::getAlias('@webroot/styles/all.css'))) ?>
```

And this in footer for js file

```php
<?= Html::jsFile('@web/scripts/all.js?v=' . filemtime(Yii::getAlias('@webroot/scripts/all.js'))) ?>
```