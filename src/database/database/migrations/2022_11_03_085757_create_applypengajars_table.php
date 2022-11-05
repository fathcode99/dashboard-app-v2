<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applypengajars', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('id_pengajar');
            $table->string('nama_pengajar');
            $table->string('asal_kampus');
            $table->string('no_telp');
            $table->string('email');
            $table->string('mapel');
            //id pengajar(sesuai yang teregister), nama pengajar, mapel
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applypengajars');
    }
};
