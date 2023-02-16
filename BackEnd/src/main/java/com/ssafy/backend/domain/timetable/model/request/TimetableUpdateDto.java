package com.ssafy.backend.domain.timetable.model.request;

import com.ssafy.backend.domain.timetable.entity.TimetableEntity;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class TimetableUpdateDto {

	@ApiParam(name = "타임 테이블")
	@ApiModelProperty(example = "["
		+ "\"0000000000000000000000000\", "
		+ "\"0000000000000000000000001\", "
		+ "\"0000000000000000000000002\", "
		+ "\"0000000000000000000000003\", "
		+ "\"0000000000000000000000004\", "
		+ "\"0000000000000000000000005\", "
		+ "\"0000000000000000000000006\", ]")
	private String[] dayString;

	public TimetableEntity toEntity() {

		return TimetableEntity.builder()
			.sun(this.dayString[0])
			.mon(this.dayString[1])
			.tue(this.dayString[2])
			.wed(this.dayString[3])
			.thr(this.dayString[4])
			.fri(this.dayString[5])
			.sat(this.dayString[6])
			.build();
	}

	public TimetableEntity updateEntity(TimetableEntity entity) {

		return TimetableEntity.builder()
			.id(entity.getId())
			.shelter(entity.getShelter())
			.sun(this.dayString[0])
			.mon(this.dayString[1])
			.tue(this.dayString[2])
			.wed(this.dayString[3])
			.thr(this.dayString[4])
			.fri(this.dayString[5])
			.sat(this.dayString[6])
			.expired(entity.getExpired())
			.createdDate(entity.getCreatedDate())
			.build();
	}
}
