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
        Schema::create('datapengajars', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('id_pengajar');
            $table->string('nama_pengajar');
            $table->string('asal_kampus');
            $table->string('no_telp');
            $table->string('email');
            $table->string('mapel');
            $table->string('nama_bank');
            $table->string('rek_bank');
            $table->string('an_rek_bank');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('datapengajars');
    }
};
