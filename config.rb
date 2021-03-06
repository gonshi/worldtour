#########################################
# Read me.
# You can use image-url($img_Path).
# For Example, if you use image "/img/hoge.jpg", you have only to write 'image-url('hoge.jpg').
# Or, if you use image "/img/common/foo.jpg", 'image-url('common/foo.jpg').

# When deploy for production, you can use command that
# compass compile -e production --force
#########################################

# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = (environment == :production)? "/": "/"
css_dir = (environment == :production)? "dist/css": ".tmp/css"
sass_dir = "src/sass"
images_dir = (environment == :production)? "dist/img": ".tmp/img"
http_images_path = "/img"
generated_images_dir = (environment == :production)? "dist/img" : ".tmp/img"
http_generated_images_path = "/img"



# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :production)? :compressed: :expanded
# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = (environment == :production)? true: true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
line_comments = (environment == :production)? false: false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
#
