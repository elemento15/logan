<?php

use Illuminate\Database\Seeder;
use App\User;

class UserAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
			'name' => 'Luis Lomeli',
			'email' => 'admin@example.com',
			'password' => Hash::make('administrator')
		]);
    }
}
