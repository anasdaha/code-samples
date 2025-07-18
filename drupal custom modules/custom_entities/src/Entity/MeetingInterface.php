<?php

namespace Drupal\custom_entities\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface defining a Meeting entity.
 */
interface MeetingInterface extends ContentEntityInterface, EntityChangedInterface, EntityOwnerInterface {

  /**
   * Gets the Meeting creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Meeting.
   */
  public function getCreatedTime();

  /**
   * Sets the Meeting creation timestamp.
   *
   * @param int $timestamp
   *   The Meeting creation timestamp.
   *
   * @return \Drupal\custom_entities\Entity\MeetingInterface
   *   The called Meeting entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Meeting published status indicator.
   *
   * Unpublished Meetings are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Meeting is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Meeting.
   *
   * @param bool $published
   *   TRUE to set this Meeting to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\custom_entities\Entity\MeetingInterface
   *   The called Meeting entity.
   */
  public function setPublished($published);

}
