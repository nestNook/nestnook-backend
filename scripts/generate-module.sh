#!/bin/bash

if [ $# -eq 0 ]; then
  echo "No module name provided. Usage: $0 m<module_name>"
  exit 1
fi

base_module_name=$1

module_path="src/modules/$base_module_name"

controllers="/controllers"
services="/services"
repositories="/repositories"
routers="/routers"

base_controllers_path="$module_path$controllers"
base_services_path="$module_path$services"
base_repositories_path="$module_path$repositories"
base_routers_path="$module_path$routers"

mkdir -p $module_path

mkdir -p "$base_controllers_path"
mkdir -p "$base_services_path"
mkdir -p "$base_repositories_path"
mkdir -p "$base_routers_path"

base_file_name=$(echo "$base_module_name" | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g' | sed 's/ //g')


export_class="export class "

echo "Generating controller"

echo $base_file_name

cc="$export_class$base_file_name"
cc+="Controller { }"

ci="$export_class$base_file_name"
ci+="ControllerInterface{ }"

ccf=$base_controllers_path
ccf+="/"
ccf+="$base_module_name"
ccf+=".controller.ts"

cif=$base_controllers_path
cif+="/"
cif+="$base_module_name"
cif+=".controller.interface.ts"


echo $cc > $ccf
echo $ci > $cif

echo "Generating service"

sc="$export_class$base_file_name"
sc+="Service { }"

si="$export_class$base_file_name"
si+="ServiceInterface { }"

scf=$base_services_path
scf+="/"
scf+="$base_module_name"
scf+=".service.ts"

sif=$base_services_path
sif+="/"
sif+="$base_module_name"
sif+=".service.interface.ts"

echo $sc > $scf
echo $si > $sif

echo "Genrating repository"

rc="$export_class$base_file_name"
rc+="Repository { }"

ri="$export_class$base_file_name"
ri+="RepositoryInterface { }"

rcf=$base_repositories_path
rcf+="/"
rcf+="$base_module_name"
rcf+=".repository.ts"

rif=$base_repositories_path
rif+="/"
rif+="$base_module_name"
rif+=".repository.interface.ts"

echo $rc > $rcf
echo $ri > $rif

echo "Generating router"

rtc="$export_class$base_file_name"
rtc+="Router { }"

rtf=$base_routers_path
rtf+="/"
rtf+="$base_module_name"
rtf+=".router.ts"

echo $rtc > $rtf

echo "Generatins module file"

mff=$module_path
mff+="/"
mff+=$base_module_name
mff+=".module.ts"

mfc="$export_class$base_file_name"
mfc+="Module { }"

echo $mfc > $mff


echo "Module generated"
