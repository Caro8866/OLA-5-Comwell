#!/bin/sh
set -e

echo "Starting data seeding..."

npx nestjs-command create:hotels
echo "Hotels created."

npx nestjs-command create:hotel-rooms
echo "Hotel rooms created."

npx nestjs-command create:packages
echo "Packages created."

npx nestjs-command create:offers
echo "Offers created."

echo "Starting application..."
exec npm start
