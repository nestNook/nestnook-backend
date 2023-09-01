#!/bin/bash

module_file_name=""

if [ $# -eq 0 ]; then
  read -p "Module name: " $module_file_name
else
  module_file_name=$1
fi

echo "Starting..."

# Folder names

module_path="src/modules/$module_file_name"
controllers_folder="/controllers"
services_folder="/services"
repositories_folder="/repositories"
routers_folder="/routers"
dtos_folder="/dtos"

# Folder paths

controllers_path="$module_path$controllers_folder"
services_path="$module_path$services_folder"
repositories_path="$module_path$repositories_folder"
routers_path="$module_path$routers_folder"
dtos_path="$module_path$dtos_folder"

echo "Creating folders"

mkdir -p "$module_path"
mkdir -p "$controllers_path"
mkdir -p "$services_path"
mkdir -p "$repositories_path"
mkdir -p "$routers_path"
mkdir -p "$dtos_path"

# Module name and Module Variable name
module_name=$(echo "$module_file_name" | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g' | sed 's/ //g')
module_variable_name="${module_name,}"


# File names
controller_class_filename="$module_file_name.controller.ts"
controller_class_absolute_path="$controllers_path/$controller_class_filename"

controller_interface_filename="$module_file_name.controller.interface.ts"
controller_interface_absolute_path="$controllers_path/$controller_interface_filename"

service_class_filename="$module_file_name.service.ts"
service_class_absolute_path="$services_path/$service_class_filename"

service_interface_filename="$module_file_name.service.interface.ts"
service_interface_absolute_path="$services_path/$service_interface_filename"

repository_class_filename="$module_file_name.repository.ts"
repository_class_absolute_path="$repositories_path/$repository_class_filename"

repository_interface_filename="$module_file_name.repository.interface.ts"
repository_interface_absolute_path="$repositories_path/$repository_interface_filename"

router_filename="$module_file_name.router.ts"
router_absolute_path="$routers_path/$router_filename"

module_class_filename="$module_file_name.module.ts"
module_class_absolute_path="$module_path/$module_class_filename"


# Copying base file contents and replace placeholders

module_name_placeholder="MODULE_NAME"
module_variable_name_placeholder="MODULE_VARIABLE_NAME"
module_filename_placeholder="MODULE_FILENAME"

echo "Creating files"

## Controller class
cp "scripts/base/module.controller.txt" $controller_class_absolute_path
sed -i "s/$module_name_placeholder/$module_name/g" $controller_class_absolute_path
sed -i "s/$module_filename_placeholder/$module_file_name/g" $controller_class_absolute_path
sed -i "s/$module_variable_name_placeholder/$module_variable_name/g" $controller_class_absolute_path

## Controller interface
cp "scripts/base/module.controller.interface.txt" $controller_interface_absolute_path
sed -i "s/$module_name_placeholder/$module_name/g" $controller_interface_absolute_path

## Service class
cp "scripts/base/module.service.txt" $service_class_absolute_path
sed -i "s/$module_name_placeholder/$module_name/g" $service_class_absolute_path
sed -i "s/$module_filename_placeholder/$module_file_name/g" $service_class_absolute_path
sed -i "s/$module_variable_name_placeholder/$module_variable_name/g" $service_class_absolute_path

## Service interface
cp "scripts/base/module.service.interface.txt" $service_interface_absolute_path
sed -i "s/$module_name_placeholder/$module_name/g" $service_interface_absolute_path

## Repository class
cp "scripts/base/module.repository.txt" $repository_class_absolute_path
sed -i "s/$module_name_placeholder/$module_name/g" $repository_class_absolute_path
sed -i "s/$module_filename_placeholder/$module_file_name/g" $repository_class_absolute_path
sed -i "s/$module_variable_name_placeholder/$module_variable_name/g" $repository_class_absolute_path

## Repository interface
cp "scripts/base/module.repository.interface.txt" $repository_interface_absolute_path
sed -i "s/$module_name_placeholder/$module_name/g" $repository_interface_absolute_path

## Router class
cp "scripts/base/module.router.txt" $router_absolute_path
sed -i "s/$module_name_placeholder/$module_name/g" $router_absolute_path
sed -i "s/$module_filename_placeholder/$module_file_name/g" $router_absolute_path
sed -i "s/$module_variable_name_placeholder/$module_variable_name/g" $router_absolute_path

## Module class
cp "scripts/base/module.module.txt" $module_class_absolute_path
sed -i "s/$module_filename_placeholder/$module_file_name/g" $module_class_absolute_path
sed -i "s/$module_name_placeholder/$module_name/g" $module_class_absolute_path

echo "Creating $module_name module"

# Import the new module into AppModule

search="AppModule("
replace="AppModule($module_name, "
filename="src/modules/app.module.ts"

sed -i "1iimport $module_name from \"./$module_file_name/$module_file_name.module\"" $filename
sed -i "s/$search/$replace/" $filename

echo "Done!"