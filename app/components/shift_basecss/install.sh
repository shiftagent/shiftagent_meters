#!/bin/sh
#
# Symlinks styles into project styles

x=`pwd`
#now lets cut off /components/shift_basecss

x="${x%/*}"
x="${x%/*}"
#x now looks like ~/path/to/shift_project/app

echo "Linking..."
echo "       ${x}/components/shift_basecss/styles/base"
echo "to:    ${x}/styles/base"
ln -s ${x}/components/shift_basecss/app/styles/base ${x}/styles/shift/base

echo "shift_basecss: All linked up!"