<template>
  <div>
    <ReagentLotForm
      :visibility.sync="isReagentLotFormVisible"
      :value="selectedReagentLot"
      @created="updateReagentLots"
      @closed="closeReagentLotForm"
    />
    <el-card style="max-width: 1400px">
      <el-switch @input="switchEditionState" :value="isEditionState" />
      <el-table :data="reagentLots" stripe>
        <el-table-column label="Product name" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Company name" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Serial name" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.serialName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Serial number" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.serialNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Production date" width="180">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.productionDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Expiration date" width="180">
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.expirationDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="180">
          <template slot-scope="scope">
            <div>
              <div v-if="isAvailable(scope.row.status)">
                {{ scope.row.status }}
                <i style="color: #33be33" class="el-icon-success" />
              </div>
              <div v-else>
                {{ scope.row.status }}
                <i style="color: #e11270" class="el-icon-error" />
              </div>
              <div
                v-if="
                  isOneWeekLeft(
                    scope.row.productionDate,
                    scope.row.expirationDate
                  )
                "
              >
                <el-tag type="warning">One week left</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <div v-show="isEditionState">
              <el-button
                :key="`${scope}_add`"
                type="primary"
                circle
                class="el-icon-plus"
                @click="openReagentLotForm"
              />
            </div>
          </template>
          <template slot-scope="scope">
            <div
              v-show="isEditionState"
              style="display: flex; padding-bottom: 10px"
            >
              <el-button
                style="padding: 7px 22px"
                :key="`${scope}_edit`"
                size="mini"
                type="secondary"
                @click="editReagentLot(scope.row, scope.$index)"
                >Edit</el-button
              >
            </div>
            <div v-show="isEditionState">
              <el-button
                :key="`${scope}_delete`"
                size="mini"
                type="danger"
                @click="deleteReagentLot(scope.row, scope.$index)"
                >Delete</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ReagentLotForm from "./ReagentLotForm.vue";
import {
  ReagentLot,
  ReagentLots,
  ReagentLotFormModel,
  emptyReagentLotForm,
} from "../models/reagent-lot";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";

@Component({
  components: {
    ReagentLotForm,
  },
})
export default class ReagentLotsTable extends Vue {
  public isReagentLotFormVisible = false;
  public isEditionState = false;
  public reagentLots: ReagentLots = [];
  public selectedReagentLot: ReagentLotFormModel = emptyReagentLotForm;

  public async created() {
    await this.getReagentLots();
  }

  public async getReagentLots() {
    const reagentLotsResponse = await axios.get(`${API_BASE_URL}/reagentLots`);
    this.reagentLots = reagentLotsResponse.data;
  }

  public switchEditionState() {
    this.isEditionState = !this.isEditionState;
  }

  public formatDate(item: Date) {
    console.log(item);

    const date = new Date(item);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  public isOneWeekLeft(date1: Date, date2: Date) {
    const WEEK_MILLISECONDS = 1000 * 60 * 60 * 24 * 7;
    const date1Milliseconds = new Date(date1).getTime();
    const date2Milliseconds = new Date(date2).getTime();
    const millisecondsLeft = Math.abs(date1Milliseconds - date2Milliseconds);
    return Math.floor(millisecondsLeft / WEEK_MILLISECONDS) <= 1;
  }

  public isAvailable(status: string) {
    // Next : replace by constants
    if (status === "In stock" || status === "In use") {
      return true;
    } else if (status === "Retired" || status === "Expired") {
      return false;
    }
  }

  public async updateReagentLots(item: ReagentLot) {
    if (item.id === "") {
      await axios.post(`${API_BASE_URL}/reagentLots`, item);
    } else {
      await axios.patch(`${API_BASE_URL}/reagentLots/${item.id}`, item);
    }
    await this.getReagentLots();
  }

  public editReagentLot(item: ReagentLot) {
    const dates = [
      item.productionDate as Required<Date>,
      item.expirationDate as Required<Date>,
    ];
    delete item.productionDate;
    delete item.expirationDate;
    this.selectedReagentLot = { ...item, dates };
    this.openReagentLotForm();
  }

  public async deleteReagentLot(item: ReagentLot) {
    await axios.delete(`${API_BASE_URL}/reagentLots/${item.id}`);
    await this.getReagentLots();
  }

  public openReagentLotForm() {
    this.isReagentLotFormVisible = true;
  }

  public closeReagentLotForm() {
    // Next : Reset form fields
    this.selectedReagentLot = emptyReagentLotForm;
    this.isReagentLotFormVisible = false;
  }
}
</script>
