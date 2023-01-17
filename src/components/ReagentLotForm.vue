<template>
  <div>
    <el-dialog
      :title="reagentLotTitle"
      :visible="visibility"
      :before-close="close"
    >
      <el-form :model="value" label-width="120px" label-position="left">
        <el-form-item label="Product name">
          <el-input type="text" v-model="value.productName" />
        </el-form-item>
        <el-form-item label="Company name">
          <el-input type="text" v-model="value.companyName" />
        </el-form-item>
        <el-form-item label="Serial name">
          <el-input type="text" v-model="value.serialName" />
        </el-form-item>
        <el-form-item label="Serial number">
          <el-input-number v-model="value.serialNumber" />
        </el-form-item>
        <el-form-item label="Dates">
          <el-date-picker
            v-model="value.dates"
            type="daterange"
            range-separator="To"
            start-placeholder="Production date"
            end-placeholder="Expiration date"
          />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="value.status" placeholder="Select status">
            <el-option label="In stock" value="In stock" />
            <el-option label="In use" value="In use" />
            <el-option label="Retired" value="Retired" />
            <el-option label="Expired" value="Expired" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="!isNewReagentLotValid"
            type="primary"
            @click="create"
            >Create</el-button
          >
          <el-button @click="close">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ReagentLot, ReagentLotFormModel } from "../models/reagent-lot";

@Component
export default class ReagentLotForm extends Vue {
  @Prop()
  visibility!: boolean;

  @Prop()
  value!: ReagentLotFormModel;

  public get newReagentLot(): ReagentLot {
    return {
      id: this.value.id,
      productName: this.value.productName,
      companyName: this.value.companyName,
      serialName: this.value.serialName,
      serialNumber: this.value.serialNumber,
      productionDate: Array.isArray(this.value.dates)
        ? new Date(this.value.dates[0])
        : null,
      expirationDate: Array.isArray(this.value.dates)
        ? new Date(this.value.dates[1])
        : null,
      status: this.value.status,
    };
  }

  public get reagentLotTitle(): string {
    if (this.value.id) {
      return `Reagent Lot ${this.value.id}`;
    } else {
      return "New Reagent Lot";
    }
  }

  public get isNewReagentLotValid(): boolean {
    // Next: Dynamic validation
    return (
      this.newReagentLot.productName !== "" &&
      this.newReagentLot.companyName !== "" &&
      this.newReagentLot.serialName !== "" &&
      this.newReagentLot.serialNumber !== 0 &&
      this.newReagentLot.productionDate !== null &&
      this.newReagentLot.expirationDate !== null &&
      this.newReagentLot.status !== ""
    );
  }

  log() {
    console.log(this.value.dates);
  }

  public create() {
    console.log(this.newReagentLot.productionDate);
    console.log(this.newReagentLot.expirationDate);
    this.$emit("created", this.newReagentLot);
    this.close();
  }

  public close() {
    this.$emit("closed");
  }
}
</script>
